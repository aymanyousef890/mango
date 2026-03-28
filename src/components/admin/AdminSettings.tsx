import { useStore } from '@/contexts/StoreContext';
import { useState, useRef } from 'react';
import { SiteSettings } from '@/data/siteSettings';
import { Upload } from 'lucide-react';

const AdminSettings = () => {
  const { siteSettings, setSiteSettings } = useStore();
  const [form, setForm] = useState<SiteSettings>({ ...siteSettings });
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (key: keyof SiteSettings, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSiteSettings({ ...form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);


  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setForm(prev => ({ ...prev, heroImage: dataUrl }));
      setSaved(false);
    };
    reader.readAsDataURL(file);
  };

  const Field = ({ label, field, type = 'text', rows }: { label: string; field: keyof SiteSettings; type?: string; rows?: number }) => (
    <div>
      <label className="block text-xs font-heading uppercase tracking-widest text-muted-foreground mb-1.5">{label}</label>
      {rows ? (
        <textarea
          value={form[field]}
          onChange={e => update(field, e.target.value)}
          rows={rows}
          className="w-full px-3 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-accent"
        />
      ) : (
        <input
          type={type}
          value={form[field]}
          onChange={e => update(field, e.target.value)}
          className="w-full px-3 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-accent"
        />
      )}
    </div>
  );

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-lg text-foreground">Site Settings</h2>
        <button
          onClick={handleSave}
          className={`px-6 py-2 text-sm font-heading uppercase tracking-widest transition-colors ${
            saved ? 'bg-green-600 text-white' : 'bg-foreground text-background hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <div className="border border-border p-5 space-y-4">
          <h3 className="font-heading text-sm tracking-widest text-foreground">Hero Section</h3>
          
          {/* Hero Image Upload */}
          <div>
            <label className="block text-xs font-heading uppercase tracking-widest text-muted-foreground mb-1.5">Hero Image</label>
            <div className="flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleHeroImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 border border-border text-sm text-foreground hover:bg-secondary transition-colors"
              >
                <Upload size={16} /> Upload Image
              </button>
              {form.heroImage && (
                <img src={form.heroImage} alt="Hero preview" className="h-16 w-24 object-cover border border-border" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Title (English)" field="heroTitleEn" />
            <Field label="Title (Arabic)" field="heroTitleAr" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Subtitle (English)" field="heroSubtitleEn" />
            <Field label="Subtitle (Arabic)" field="heroSubtitleAr" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Description (English)" field="heroDescriptionEn" rows={3} />
            <Field label="Description (Arabic)" field="heroDescriptionAr" rows={3} />
          </div>
        </div>

        {/* Contact Info */}
        <div className="border border-border p-5 space-y-4">
          <h3 className="font-heading text-sm tracking-widest text-foreground">Contact Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email" field="email" type="email" />
            <Field label="Phone" field="phone" type="tel" />
          </div>
          <Field label="WhatsApp Number" field="whatsapp" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Address (English)" field="addressEn" />
            <Field label="Address (Arabic)" field="addressAr" />
          </div>
        </div>

        {/* Social Links */}
        <div className="border border-border p-5 space-y-4">
          <h3 className="font-heading text-sm tracking-widest text-foreground">Social Media & Map</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Facebook URL" field="facebook" />
            <Field label="Instagram URL" field="instagram" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="TikTok URL" field="tiktok" />
            <Field label="Google Maps Embed URL" field="mapEmbedUrl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
