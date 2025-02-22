import type { OdFileObject } from '../../types'
import { FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import DownloadButtonGroup from '../DownloadBtnGtoup'
import { DownloadBtnContainer } from './Containers'
import { getBaseUrl } from '../../utils/getBaseUrl'
import { getStoredToken } from '../../utils/protectedRouteHandler'

const OfficePreview: FC<{ file: OdFileObject }> = ({ file }) => {
  const { asPath } = useRouter()
  const hashedToken = getStoredToken(asPath)

  const docContainer = useRef<HTMLDivElement>(null)
  const [docContainerWidth, setDocContainerWidth] = useState(600)

  const fileUrl = `${getBaseUrl()}/api/raw/?path=${asPath}${hashedToken ? `&odpt=${hashedToken}` : ''}`

  useEffect(() => {
    setDocContainerWidth(docContainer.current ? docContainer.current.offsetWidth : 600)
  }, [])

  let viewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`

  return (
    <div>
      <div className="overflow-scroll" ref={docContainer} style={{ maxHeight: '90vh' }}>
          <iframe src={viewerUrl} width={docContainerWidth} height="600" style={{ border: 'none' }} />
      </div>
      <DownloadBtnContainer>
        <DownloadButtonGroup />
      </DownloadBtnContainer>
    </div>
  )
}

export default OfficePreview
