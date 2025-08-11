import { useEffect } from 'react';

const SEOComponent = ({
    title = 'TaleSpace - Free Stories & Books Online',
    description = 'Discover amazing free stories and books online. Read fantasy, romance, mystery, thriller, and more genres.',
    keywords = 'free stories, free books, online reading, fantasy stories, romance books, mystery novels',
    image = '',
    url = '',
    type = 'website'
}) => {
    useEffect(() => {
        // Update document title
        document.title = title;

        // Function to update or create meta tag
        const updateMetaTag = (name, content, property = false) => {
            if (!content) return;

            const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
            let meta = document.querySelector(selector);

            if (meta) {
                meta.setAttribute('content', content);
            } else {
                meta = document.createElement('meta');
                if (property) {
                    meta.setAttribute('property', name);
                } else {
                    meta.setAttribute('name', name);
                }
                meta.setAttribute('content', content);
                document.head.appendChild(meta);
            }
        };

        // Update basic meta tags
        updateMetaTag('description', description);
        updateMetaTag('keywords', keywords);

        // Update Open Graph tags
        updateMetaTag('og:title', title, true);
        updateMetaTag('og:description', description, true);
        updateMetaTag('og:type', type, true);

        if (image) {
            updateMetaTag('og:image', image, true);
        }

        if (url) {
            updateMetaTag('og:url', url, true);
        }

        // Update Twitter Card tags
        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:title', title);
        updateMetaTag('twitter:description', description);

        if (image) {
            updateMetaTag('twitter:image', image);
        }

        // Update canonical URL if provided
        if (url) {
            let canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) {
                canonical.setAttribute('href', url);
            } else {
                canonical = document.createElement('link');
                canonical.setAttribute('rel', 'canonical');
                canonical.setAttribute('href', url);
                document.head.appendChild(canonical);
            }
        }

    }, [title, description, keywords, image, url, type]);

    return null; // This component doesn't render anything
};

export default SEOComponent;
