export function setTitle(title) {
  document.title = title;
}

export function setMetaDescription(desc) {
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = 'description';
    document.head.appendChild(tag);
  }
  tag.content = desc;
}
