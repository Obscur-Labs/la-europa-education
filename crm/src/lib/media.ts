const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Uploads live on Cloudinary and are stored as absolute https URLs. Records
 * created before that migration still hold a relative `/uploads/…` path served
 * by the backend, so those get the API origin prepended.
 */
export function fileHref(fileUrl?: string): string {
  if (!fileUrl) return '';
  if (/^https?:\/\//i.test(fileUrl)) return fileUrl;
  return `${API_BASE.replace('/api', '')}${fileUrl}`;
}
