import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default {
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        css: {
            preprocessorOptions: {
                sass: {
                    sassOptions: {
                        includePaths: ['./src'],
                    },
                },
            },
        },
    },
}
