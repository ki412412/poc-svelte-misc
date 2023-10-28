import type { PageServerLoad } from './$types';
import { users } from '$lib/users';
import Fs from 'fs';


function createdDate(file: Fs.PathLike) {  
    const { birthtime } = Fs.statSync(file)
  
    return birthtime
}

function deleteOldFiles(dir: Fs.PathLike) {
    const now = Date.now();
    const files = Fs.readdirSync(dir);
    for (const file of files) {
        const filePath = `${dir}/${file}`;
        const created = createdDate(filePath);
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        
        if (file.startsWith('favicon')) {
            continue;
        }
        if (now - created > oneHour) {
            Fs.unlinkSync(filePath);
        }
    }
}

export const load = (async () => {

    deleteOldFiles('static');
    
    return {
        users: users
    };
}) satisfies PageServerLoad;