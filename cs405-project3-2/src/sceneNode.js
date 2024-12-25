
/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

 class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        const currentMvp = mvp;
        const currentModelView = modelView;
        const currentNormalMatrix = normalMatrix;
        const currentModelMatrix = modelMatrix;
    
        const localTransformationMatrix = this.trs.getTransformationMatrix();
    
        const updatedModelMatrix = MatrixMult(currentModelMatrix, localTransformationMatrix);
        const updatedModelViewMatrix = MatrixMult(currentModelView, localTransformationMatrix);
        const updatedNormalMatrix = MatrixMult(currentNormalMatrix, localTransformationMatrix);
        const updatedMvpMatrix = MatrixMult(currentMvp, localTransformationMatrix);
    
        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(updatedMvpMatrix, updatedModelViewMatrix, updatedNormalMatrix, updatedModelMatrix);
        }
    
        for (const child of this.children) {
            child.draw(updatedMvpMatrix, updatedModelViewMatrix, updatedNormalMatrix, updatedModelMatrix);
        }
    }
    
    

}