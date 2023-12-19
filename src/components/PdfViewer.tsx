import {PDFPageProxy} from 'pdfjs-dist'
import {useRef, useState} from 'react'
import {usePdfDocument} from './usePdfDocument.ts'
import {usePdfViewer} from './usePdfViewer.ts'
import 'pdfjs-dist/build/pdf.worker'

interface IPdfViewerProps {
	bytes: Uint8Array
}

export const PdfViewer = (
	({bytes}: IPdfViewerProps) => {
		const canvasRef = useRef<HTMLCanvasElement>(null)
		const [pdfPage, setPdfPage] = useState<PDFPageProxy | null>(null)

		usePdfDocument(setPdfPage, bytes)
		usePdfViewer(canvasRef, pdfPage)

		return (
			<div>
				<canvas ref={canvasRef}></canvas>
			</div>
		)
	}
)