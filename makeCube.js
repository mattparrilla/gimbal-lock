// Can ignore this file for purposes of gimbal lock question

import * as THREE from 'three';

const cube_colors = [
    0xff0000,
    0xffff00,
    0xff00ff,
    0x00ff00,
    0x0000ff,
    0xffffff
];

export const makeCube = () => {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { vertexColors: true } );
    const positionAttribute = geometry.getAttribute('position');
    const colors = [];
    const color = new THREE.Color();
    for (let i = 0; i < cube_colors.length; i++) {
        color.set(cube_colors[i]);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);

    }
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    return new THREE.Mesh( geometry, material );
}