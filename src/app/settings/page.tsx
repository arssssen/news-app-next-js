'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FileDownloadSection } from '@/features/file-download/ui/FileDownloadSection'
import { FileUploadSection } from '@/features/file-upload/ui/FileUploadSection'
import { useAuth } from '@/processes/auth/model/useAuth'

export default function SettingsPage() {
  const { status, supportMessage, logoutUser } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-ink/60">Control access, alerts, and files.</p>
      </div>

      <Card className="space-y-6">
        <FileUploadSection />
        <FileDownloadSection />
      </Card>

      <div>
        <Button variant="destructive" onClick={logoutUser}>
          Logout
        </Button>
      </div>
    </div>
  )
}
