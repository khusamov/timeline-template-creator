import {getDocument} from 'pdfjs-dist'
import {RenderParameters, RenderTask} from 'pdfjs-dist/types/src/display/api'
import {RefObject} from 'react'
import useAsyncEffect from 'use-async-effect'
import {useCanvas2DContext} from '../hooks/useCanvas2DContext.ts'

const scale = 0.6

export function usePdfViewer(canvasRef: RefObject<HTMLCanvasElement>, bytes: Uint8Array) {
	useAsyncEffect<RenderTask | null>(async isMounted => {
		console.log('-------------------', 'useAsyncEffect')

		const [canvas, context] = useCanvas2DContext(canvasRef)

		let renderTask: RenderTask | null = null

		const loadingTask = getDocument(bytes)
		const pdf = await loadingTask.promise
		const page1 = await pdf.getPage(1)
		if (!isMounted()) {
			return null
		}

		console.log('-------------------', 'isMounted1')

		const viewportOfPage1 = page1.getViewport({scale})

		canvas.height = viewportOfPage1.height
		canvas.width = viewportOfPage1.width
		const renderContext: RenderParameters = {
			canvasContext: context,
			viewport: viewportOfPage1
		}
		renderTask = page1.render(renderContext)
		if (!isMounted()) {
			return null
		}

		console.log('-------------------', 'isMounted2')

		return renderTask
	}, (renderTask?: RenderTask | null) => {
		console.log('-----------------renderTask', renderTask)
		if (renderTask) {
			renderTask.cancel()
		}
	}, [canvasRef.current])
}