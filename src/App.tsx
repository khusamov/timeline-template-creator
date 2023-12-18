import './App.scss'
import {saveAs} from 'file-saver'
import {useState} from 'react'
import useAsyncEffect from 'use-async-effect'
import {PdfViewer} from './components/PdfViewer.tsx'
import {createSamplePdf} from './functions/createSamplePdf.ts'

const pdfFilename = 'Типа это PDF.pdf'

export const App = () => {
	const [document, setDocument] = useState<Uint8Array | null>(null)

	useAsyncEffect<null>(async isMounted => {
		const pdfBytes = await createSamplePdf()
		if (!isMounted()) {
			return null
		}
		setDocument(pdfBytes)
		return null
	})

	const onDownloadButtonClick = () => {
		if (document) {
			saveAs(new Blob([document]), pdfFilename)
		}
	}

	return (
		<div>
			<div>Timeline template creator</div>
			<div>
				<button disabled={document === null} onClick={onDownloadButtonClick}>
					Скачать PDF
				</button>
			</div>
			{document && <PdfViewer bytes={document}></PdfViewer>}
		</div>
	)
}
