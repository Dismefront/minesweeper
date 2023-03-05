import { concat } from "@/pieces/tools/concat";
import { FunctionComponent, PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";
import scss from './Link.module.scss';

export enum LinkDecoration {
    MENU='menu', 
    BACK='back',
    TITLE='title'
}

export interface AppLinkProps extends LinkProps {
    linkDecoration?: LinkDecoration,
    applyClass?: string
}

export const AppLink: FunctionComponent<AppLinkProps> 
        = ({ target, children, to, linkDecoration=LinkDecoration.MENU, applyClass='' }) => {
    return (
        <Link target={target} to={to} className={concat(scss.Link, scss[linkDecoration], applyClass)}>
            { children }
        </Link>
    )
}