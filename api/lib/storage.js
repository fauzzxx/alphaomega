import { supabase } from './supabase.js';

/**
 * Generates a signed URL for a file in a private bucket
 * @param {string} bucket - The bucket name
 * @param {string} path - The file path in the bucket
 * @param {number} expiresIn - Expiration in seconds (default 1 hour)
 * @returns {Promise<string>} - The signed URL
 */
export const getSignedUrl = async (bucket, path, expiresIn = 3600) => {
    const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, expiresIn);

    if (error) {
        console.error(`Error generating signed URL for ${path}:`, error.message);
        throw error;
    }

    return data.signedUrl;
};
