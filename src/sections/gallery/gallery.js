import PhotoSwipe from 'photoswipe';

console.log('sanity')

document.addEventListener('DOMContentLoaded', () => {
  const galleryElements = document.querySelectorAll('#gallery--photoswipe-gallery a');

  const items = Array.from(galleryElements).map(link => ({
    src: link.getAttribute('href'),
    w: parseInt(link.getAttribute('data-pswp-width')),
    h: parseInt(link.getAttribute('data-pswp-height')),
  }));

  console.log('items: ', items);

  const gallery = new PhotoSwipe({
    dataSource: items,
    gallerySelector: '.photoswipe-gallery',
  });

  console.log('gallery: ', gallery);

  gallery.init();
});