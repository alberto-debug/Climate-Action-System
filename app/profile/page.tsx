"use client"

import { useState } from "react"
import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "@/components/ui/sidebar"

interface ProfileData {
  fullName: string
  username: string
  gender: string
  location: string
  language: string
  timezone: string
  email: string
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "Emmanuel Ngunnzi",
    username: "emmanuel",
    gender: "male",
    location: "Nairobi CBD",
    language: "en",
    timezone: "eat",
    email: "ngunnzie@gmail.com",
  })

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex h-screen bg-[#7ac943]/10">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold">Welcome, Emmanuel</h1>
            <p className="text-sm text-gray-500">Tue, 07 June 2025</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="size-5" />
            </Button>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Profile%20Settings.jpg-CzeBzBVhdsLoZoAJuiCshTSJcWMJWX.jpeg"
              alt="Profile"
              className="size-10 rounded-full object-cover"
            />
          </div>
        </header>
        <main className="container mx-auto max-w-4xl p-6">
          <Card>
            <CardContent className="p-6">
              <div className="mb-8 flex items-center gap-4">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Profile%20Settings.jpg-CzeBzBVhdsLoZoAJuiCshTSJcWMJWX.jpeg"
                  alt="Profile"
                  className="size-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{profileData.fullName}</h2>
                  <p className="text-gray-500">{profileData.email}</p>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profileData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={profileData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={profileData.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select value={profileData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eat">EAT (UTC+3)</SelectItem>
                      <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
                      <SelectItem value="est">EST (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold">My Email Address</h3>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="size-10 rounded-full bg-blue-100 p-2">
                    <svg className="size-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{profileData.email}</p>
                    <p className="text-sm text-gray-500">1 month ago</p>
                  </div>
                </div>
                <Button variant="link" className="mt-2 text-[#7ac943]">
                  + Add Email Address
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

