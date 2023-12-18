import {useRef} from 'react'
import 'pdfjs-dist/build/pdf.worker'
import {usePdfViewer} from './usePdfViewer.ts'

interface IPdfViewerProps {
	bytes: Uint8Array
}

export const PdfViewer = (
	({bytes}: IPdfViewerProps) => {
		const canvasRef = useRef<HTMLCanvasElement>(null)
		usePdfViewer(canvasRef, bytes)
		return (
			<div>
				<canvas ref={canvasRef}></canvas>
			</div>
		)
	}
)