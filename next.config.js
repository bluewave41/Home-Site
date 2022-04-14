/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack: function (config, { isServer, webpack }) {
        if (!isServer) {
            config.plugins.push(
                new webpack.IgnorePlugin({ resourceRegExp: /get-session/ })
            );
        }
        return config;
    }
}

module.exports = nextConfig
