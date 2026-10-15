export type ResourceType = 'image' | 'raw';

export function resourceTypeFor(file: string): ResourceType;
export function publicIdFor(relPath: string, folder: string, resourceType: ResourceType): string;
export function assetFolderFor(publicId: string): string;
export function signParams(params: Record<string, string | number>, apiSecret: string): string;
export function sha1(buffer: Uint8Array): string;
