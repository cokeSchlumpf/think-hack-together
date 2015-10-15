export default function() {
  let result = '/';
  const pathnames = window.location.pathname.split('/');

  if (pathnames.length > 1 && pathnames[1].length > 0) {
    result = '/' + pathnames[1];
  }

  return result;
}
