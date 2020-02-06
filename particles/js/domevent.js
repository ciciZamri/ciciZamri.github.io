window.addEventListener('resize', () => {
    view.camera.aspect = viewportContainer.clientWidth / viewportContainer.clientHeight;
    view.camera.updateProjectionMatrix();
    view.renderer.setSize(viewportContainer.clientWidth, viewportContainer.clientHeight);
});