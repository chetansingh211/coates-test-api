import {server} from './server';
import {component} from './component';
import * as modules from './modules';

const tags = {
  name:'Coates CRUD operations'
}

const swaggerInfo = {
  openapi:  "3.0.0",
  info:{
    version:"1.0.0",
    title:"Coates",
    description: "Coates API backend",
  },
}

const swaggerDocument = {
    ...swaggerInfo,
    ...server,
    ...component,
    ...tags,
    ...modules,
  };

export default swaggerDocument;