export function getNumberProp(propName: string, postfix: string): number {
    const rootStyle = getComputedStyle(document.documentElement);
    const propStr: string = rootStyle.getPropertyValue(propName);
    const prop: number = Number.parseInt(propStr.slice(0, propStr.indexOf(postfix)));
    return prop
}