const ServiceBrances = require('../static/ServiceBranches').default;

const children = [];
const generateChildren = () => {
    const numberOfChildren = Math.floor(Math.random() * 5) + 1;
    for(let i = 0; i < numberOfChildren; i+=1){
        children.push({name: ServiceBrances[Math.floor(Math.random()*ServiceBrances.length)]})
    }
    generateGrandChildren();
    generateGreatGrandChildren();
    return children;
};

const generateGrandChildren = () => {
    for(let i = 0; i < children.length; i+=1){
        const child = children[i];
        const grandChildren = [];
        const numberOfGrandChildren = Math.floor(Math.random() * 5);
        for(let j = 0; j < numberOfGrandChildren; j+=1){
          grandChildren.push({name: ServiceBrances[Math.floor(Math.random()*ServiceBrances.length)]})
        }
        child.children = grandChildren;
    }
};

const generateGreatGrandChildren = () => {
    for(let i = 0; i < children.length; i+=1){
        for(let j = 0; j < children[i].children.length; j+=1){
          const grandChild = children[i].children[j];
          const numberOfGreatGrandChildren = Math.floor(Math.random() * 5);
          const greatGrandChildren = [];
          for(let k = 0; k < numberOfGreatGrandChildren; k+=1){
            greatGrandChildren.push({name: ServiceBrances[Math.floor(Math.random()*ServiceBrances.length)]})
          }
          grandChild.children = greatGrandChildren;
        }
    }
};


module.exports.generateChildren = generateChildren;