// Allows TypeScript to recognize and import .png image files without throwing module type errors.
declare module '*.png' {
    const value: any;
    export default value;
}
