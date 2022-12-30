
import { CSSProperties, FC } from 'react';
import styles from './loader.module.css'; 

interface Props {
    className?: string;
    style?: CSSProperties;
}

export const Loader:FC<Props> = ({ className = '', style = {} }) => {
    return (
        <span className={`${styles.loader} ${className}`}  style={style}></span>
    )
}
