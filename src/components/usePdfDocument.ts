import {getDocument, PDFDocumentLoadingTask, PDFPageProxy} from 'pdfjs-dist'
import {useEffect} from 'react'

const firstPageNumber = 1
type TSetPdfPageFunction = (pdfPage: PDFPageProxy) => void

export function usePdfDocument(setPdfPage: TSetPdfPageFunction, bytes: Uint8Array): void {
	useEffect(
		() => {
			let isCanceled = false
			let loadingTask: (PDFDocumentLoadingTask | null) = null

			async function loadPage() {
				if (isCanceled) return
				loadingTask = getDocument(bytes)
				try {
					const pdf = await loadingTask.promise
					if (isCanceled) return
					const firstPage = await pdf.getPage(firstPageNumber)
					if (isCanceled) return
					setPdfPage(firstPage)

				} catch (error) {
					if (!(error instanceof Error) || error.message !== 'Loading aborted') {
						throw error
					}
				}
			}

			loadPage()

			return () => {
				isCanceled = true
				if (loadingTask) {
					loadingTask.destroy()
				}
			}
		},
		[bytes]
	)
}