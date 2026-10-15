import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  createResolver,
  deliveryUrl,
  withTransforms,
  type CloudinaryAsset,
} from '../src/lib/cloudinary';
import imageLoader from '../src/lib/image-loader';
import {
  assetFolderFor,
  publicIdFor,
  resourceTypeFor,
  signParams,
} from '../scripts/cloudinary-lib.mjs';

const hero: CloudinaryAsset = {
  publicId: 'aksue/images/hero',
  version: 1760000000,
  format: 'jpg',
  resourceType: 'image',
  width: 960,
  height: 540,
  hash: 'abc',
};
const HERO_URL = 'https://res.cloudinary.com/demo/image/upload/v1760000000/aksue/images/hero';

describe('deliveryUrl', () => {
  it('builds an image URL without the extension', () => {
    assert.equal(deliveryUrl('demo', hero), HERO_URL);
  });

  it('keeps .svg for vector images', () => {
    const logo = { ...hero, publicId: 'aksue/logo', format: 'svg' };
    assert.equal(
      deliveryUrl('demo', logo),
      'https://res.cloudinary.com/demo/image/upload/v1760000000/aksue/logo.svg',
    );
  });

  it('uses the raw path for documents (extension is part of the public ID)', () => {
    const pdf = {
      ...hero,
      publicId: 'aksue/files/brochure.pdf',
      format: 'pdf',
      resourceType: 'raw' as const,
    };
    assert.equal(
      deliveryUrl('demo', pdf),
      'https://res.cloudinary.com/demo/raw/upload/v1760000000/aksue/files/brochure.pdf',
    );
  });
});

describe('withTransforms', () => {
  it('adds auto format, auto quality and a width limit', () => {
    assert.equal(
      withTransforms(HERO_URL, { width: 640 }),
      'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_limit,w_640/v1760000000/aksue/images/hero',
    );
  });

  it('crops to an exact size for link previews', () => {
    assert.match(
      withTransforms(HERO_URL, { width: 1200, height: 630, crop: 'fill' }),
      /\/image\/upload\/f_auto,q_auto,c_fill,w_1200,h_630\/v1760000000\//,
    );
  });

  it('uses an explicit quality when given', () => {
    assert.match(
      withTransforms(HERO_URL, { width: 320, quality: 60 }),
      /f_auto,q_60,c_limit,w_320/,
    );
  });

  it('leaves local files, SVGs and raw files alone', () => {
    for (const url of [
      '/images/hero.jpg',
      'https://res.cloudinary.com/demo/image/upload/v1/aksue/logo.svg',
      'https://res.cloudinary.com/demo/raw/upload/v1/aksue/files/brochure.pdf',
    ]) {
      assert.equal(withTransforms(url, { width: 640 }), url);
    }
  });
});

describe('imageLoader', () => {
  it('requests the srcset width from Cloudinary', () => {
    assert.equal(
      imageLoader({ src: HERO_URL, width: 1080, quality: undefined }),
      'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_limit,w_1080/v1760000000/aksue/images/hero',
    );
  });

  it('serves local files as they are', () => {
    assert.equal(imageLoader({ src: '/images/hero.jpg', width: 1080 }), '/images/hero.jpg?w=1080');
  });
});

describe('createResolver', () => {
  const manifest = { '/images/hero.jpg': hero };
  const localFiles = new Set(['/images/hero.jpg', '/images/library.jpg']);

  it('prefers Cloudinary when the cloud name is set and the file was uploaded', () => {
    const resolve = createResolver({ cloudName: 'demo', manifest, localFiles });
    assert.equal(resolve('/images/hero.jpg'), HERO_URL);
  });

  it('falls back to public/ for files not uploaded yet', () => {
    const resolve = createResolver({ cloudName: 'demo', manifest, localFiles });
    assert.equal(resolve('/images/library.jpg'), '/images/library.jpg');
  });

  it('uses public/ when Cloudinary is not configured', () => {
    const resolve = createResolver({ cloudName: undefined, manifest, localFiles });
    assert.equal(resolve('/images/hero.jpg'), '/images/hero.jpg');
  });

  it('returns undefined for missing files so a placeholder shows', () => {
    const resolve = createResolver({ cloudName: 'demo', manifest, localFiles });
    assert.equal(resolve('/images/vc.jpg'), undefined);
    assert.equal(resolve(undefined), undefined);
  });
});

describe('upload helpers', () => {
  it('signs parameters the way Cloudinary documents', () => {
    // Example from Cloudinary's "Generating authentication signatures" guide.
    const params = {
      timestamp: 1315060510,
      public_id: 'sample_image',
      eager: 'w_400,h_300,c_pad|w_260,h_200,c_crop',
    };
    assert.equal(signParams(params, 'abcd'), 'bfd09f95f331f558cbd1320e67aa8d488770583e');
  });

  it('ignores empty parameters when signing', () => {
    assert.equal(
      signParams({ public_id: 'a', timestamp: 1, folder: '' }, 's'),
      signParams({ public_id: 'a', timestamp: 1 }, 's'),
    );
  });

  it('classifies images and documents', () => {
    assert.equal(resourceTypeFor('hero.JPG'), 'image');
    assert.equal(resourceTypeFor('logo.svg'), 'image');
    assert.equal(resourceTypeFor('brochure.pdf'), 'raw');
  });

  it('puts each upload in the Media Library folder of its public ID', () => {
    assert.equal(assetFolderFor('aksue/images/news/a'), 'aksue/images/news');
    assert.equal(assetFolderFor('logo'), '');
  });

  it('builds public IDs inside the folder', () => {
    assert.equal(publicIdFor('images/hero.jpg', 'aksue', 'image'), 'aksue/images/hero');
    assert.equal(publicIdFor('images\\news\\a.jpg', 'aksue/', 'image'), 'aksue/images/news/a');
    assert.equal(publicIdFor('files/brochure.pdf', 'aksue', 'raw'), 'aksue/files/brochure.pdf');
    assert.equal(publicIdFor('logo.png', '', 'image'), 'logo');
  });
});
