import { FunctionComponent, ReactNode } from "react";
import scss from './AppTable.module.scss';

export interface AppTableProps {
    payload: ReactNode[];
}

export const AppTable: FunctionComponent<AppTableProps> = ({ payload }) => {
    return (
        <table className={scss.AppTable}>
            <tbody>
                {payload.map((node, index) => (
                    <tr key={"tr" + index}>
                        <td className={scss.withBorder}>
                            {node}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}