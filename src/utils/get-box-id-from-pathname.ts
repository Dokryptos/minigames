/**
 * Extracts the box id from the pathname
 *
 * @param pathname - The pathname to extract the box id from ex: "/1/history"
 */
function getBoxIdFromPathname(pathname: string) {
  return pathname.split('/')[1] || '';
}

export default getBoxIdFromPathname;
