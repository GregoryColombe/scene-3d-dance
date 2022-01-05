import WebGL from '../WebGL'
import GregoryModel from './Mesh/GregoryModel'
import KarenModel from './Mesh/KarenModel'

import Plane from './Mesh/Plane'
import Hemisphere from './Lights/Hemisphere'
import Directional from './Lights/Directional'

export default class Environment {
  get _webgl () { return new WebGL() }
  get _resources () { return this._webgl.resources }

  constructor () {
    this.hemisphereLight = new Hemisphere()
    this.directionalLight = new Directional()

    this.plane = new Plane()

    this._resources.on('ready', () => {
      // Add your components who needs loading here (Textures, GLTF, etc.)
      this.gregoryModel = new GregoryModel()
      this.karenModel = new KarenModel()
    })
  }

  update () {
    this.gregoryModel && this.gregoryModel.update()
    this.karenModel && this.karenModel.update()
  }
}
