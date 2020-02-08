import React from 'react';

export default function SubLevelCategory(props) {
    const { sublevels, setSubcategoriaSeleccionada } = props;

    return (
        <ul className="dropdown-menu">
            {sublevels.map((s) =>
                <li key={s.id} ><a href="#" onClick={() => setSubcategoriaSeleccionada(s)} className="dropdown-item">{s.name}</a></li>
            )}
        </ul>
    )




}
