import {PDFPageProxy} from 'pdfjs-dist'
import {RenderTask} from 'pdfjs-dist/types/src/display/api'
import {RefObject, useEffect} from 'react'
import {useCanvas2DContext} from '../hooks/useCanvas2DContext.ts'

const scale = 1.2

export function usePdfViewer(canvasRef: RefObject<HTMLCanvasElement>, pdfPage: PDFPageProxy | null) {
	useEffect(
		() => {
			if (!pdfPage) {
				return
			}

			let renderTask: (RenderTask | null) = null
			let isCanceled = false
			const [canvas, context] = useCanvas2DContext(canvasRef)
			const viewportOfPage1 = pdfPage.getViewport({scale})
			canvas.height = viewportOfPage1.height
			canvas.width = viewportOfPage1.width
			if (isCanceled) return
			renderTask = pdfPage.render({
				canvasContext: context,
				viewport: viewportOfPage1
			})

			return () => {
				isCanceled = true
				if (renderTask) {
					renderTask.cancel()
				}
			}
		},
		[
			canvasRef.current,
			pdfPage
		]
	)
}