import Link from "next/link";
import React from "react";

import "./scss/index.scss";

const Breadcrumbs: React.SFC<{
    breadcrumbs: Array<{ value: string; link: string }>;
}> = ({ breadcrumbs }) => (
    <ul className="breadcrumbs">
        <li>
            <Link href="/">Home</Link>
        </li>

        {breadcrumbs.map((breadcrumb) => (
            <li key={breadcrumb.value}>
                <Link href={breadcrumb.link}>{breadcrumb.value}</Link>
            </li>
        ))}
    </ul>
);

export default Breadcrumbs;
