import { PlaneBufferGeometry, MeshStandardMaterial, Mesh, DoubleSide } from 'three'

import WebGL from '../../WebGL'

export default class Plane {
  // Instantiate the application
  get _webgl () { return new WebGL() }
  // Access to the scene
  get _scene () { return this._webgl.scene }

  constructor () {
    // Add the mothod to your constructor
    this._setInstance()
  }

  _setInstance () {
    const geometry = new PlaneBufferGeometry(5, 5)
    const material = new MeshStandardMaterial({
      color: 0x111111,
      side: DoubleSide
    })

    this.instance = new Mesh(geometry, material)
    this.instance.rotation.x = Math.PI / 2
    this.instance.receiveShadow = true

    // Add the Mesh to the scene
    this._scene.add(this.instance)
  }
}
