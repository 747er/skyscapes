import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import "photoswipe/style.css";
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

const GRID_SELECTOR = '#gallery--photoswipe-gallery';
const ITEM_SELECTOR = '.grid-item';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onDOMReady);
} else {
  onDOMReady();
}

function onDOMReady() {
  initializeGalleryWhenReady();
}

function initializeGalleryWhenReady() {
  const grid = document.querySelector(GRID_SELECTOR);

  // If we can't even find the main container, no point in observing
  if (!grid) {
    console.warn(`Cannot find grid container "${GRID_SELECTOR}".`);
    return;
  }

  let galleryElements = getGalleryElements();

  if (galleryElements.length > 0) {
    // We have our elements, initialize immediately
    initializeGallery(grid, ITEM_SELECTOR);
  } else {
    // Wait for elements to appear by observing DOM mutations
    const observer = new MutationObserver(() => {
      galleryElements = getGalleryElements();
      if (galleryElements.length > 0) {
        observer.disconnect();
        initializeGallery(grid, ITEM_SELECTOR);
      }
    });

    observer.observe(grid, { childList: true, subtree: true });
  }
}

function getGalleryElements() {
  return document.querySelectorAll(`${GRID_SELECTOR} ${ITEM_SELECTOR}`);
}

function initializeGallery(grid, ITEM_SELECTOR) {
  imagesLoaded(grid, () => {
    const msnry = new Masonry(grid, {
      itemSelector: ITEM_SELECTOR,
      columnWidth: 200
    });
    msnry.layout();

    const lightbox = new PhotoSwipeLightbox({
      gallery: GRID_SELECTOR,
      children: ITEM_SELECTOR,
      pswpModule: PhotoSwipe
    });
    lightbox.init();

    console.log('Gallery and lightbox initialized.');
  });
}