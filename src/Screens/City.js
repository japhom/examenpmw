import React, { PureComponent } from 'react';
import styles from './City.module.scss';

export default class City extends PureComponent {

render() {
    const {data} = this.props;
        return (
            <div className={styles.city}>
                <p>
                    Nombre:{data.name}
                </p>
                <li>Temperatura : {data.temp}<br/></li>
                <li>Presión : {data.presion}<br/></li>
                <li>Humedad : {data.humedad}<br /></li>
            </div>
        );
    }
}
