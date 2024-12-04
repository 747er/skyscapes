import PhotoSwipe from 'photoswipe';

document.addEventListener('DOMContentLoaded', () => {
  const galleryElements = document.querySelectorAll('.photoswipe-gallery a');

  const items = Array.from(galleryElements).map(link => ({
    src: link.getAttribute('href'),
    w: parseInt(link.getAttribute('data-pswp-width')),
    h: parseInt(link.getAttribute('data-pswp-height')),
  }));

  const gallery = new PhotoSwipe({
    dataSource: items,
    gallerySelector: '.photoswipe-gallery',
  });

  gallery.init();
});