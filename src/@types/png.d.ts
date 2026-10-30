/**
 * Lets TypeScript accept `import logo from '../images/logo.png'`.
 *
 * Metro resolves an image import to an asset registry id on native and to a
 * URL string on web, so the export is typed as `any` rather than tied to one.
 */
declare module '*.png' {
    const value: any;
    export default value;
}
