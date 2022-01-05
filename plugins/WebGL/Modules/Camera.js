import { PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import gsap from 'gsap'
import WebGL from '../WebGL.js'

export default class Camera {
  get _webgl () { return new WebGL() }
  get _canvas () { return this._webgl.canvas }
  get _sizes () { return this._webgl.sizes }
  get _scene () { return this._webgl.scene }
  get _config () { return this._webgl.config }
  get _debug () { return this._webgl.debug }

  constructor () {
    this._setInstance()

    this._debug.active && this._setOrbitControls()
  }

  _setInstance () {
    this.instance = new PerspectiveCamera(
      35,
      this._sizes.width / this._sizes.height,
      0.1,
      1000
    )

    this.instance.position.set(0, 1, 5)
    this.instance.lookAt(new Vector3(0, 0, 0))

    this._scene.add(this.instance)
  }

  moveCamera (name) {
    const duration = 1

    switch (name) {
      case 'Gregory':
        gsap.to(this.instance.position, {
          duration,
          x: 3,
          y: 1.5,
          z: 0.5,
          onUpdate: () => this.instance.lookAt(1, 0.35, 0)
        })
        break
      case 'Karen':
        gsap.to(this.instance.position, {
          duration,
          x: -3,
          y: 1.5,
          z: 0.5,
          onUpdate: () => this.instance.lookAt(-1, 0.35, 0)
        })
        break
    }
  }

  _rotateCamera (x, y, z, duration) {
    gsap.to(this.instance.rotation, { x, y, z, duration })
  }

  _setOrbitControls () {
    this.controls = new OrbitControls(this.instance, this._canvas)
    this.controls.enabled = this._debug.active
    this.controls.enableDamping = true

    this._debugFolder = this._debug.ui.addFolder({ title: 'OrbitControls' })
    this._debugFolder.addInput(this.controls, 'enabled')
  }

  resize () {
    this.instance.aspect = this._sizes.width / this._sizes.height
    this.instance.updateProjectionMatrix()
  }

  update () {
    this.controls && this.controls.update()
  }
}
