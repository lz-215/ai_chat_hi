'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* 主内容区域 */}
      <div className="flex-grow flex flex-col items-center w-full px-4 pt-8 sm:pt-10 pb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-300 mb-8">Last updated: {new Date().toLocaleDateString('en-US')}</p>

        <main className="w-full max-w-3xl bg-slate-800 bg-opacity-50 p-6 sm:p-8 rounded-lg shadow-lg">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">1. Introduction</h2>
            <p className="text-gray-200 leading-relaxed">
              Welcome to AI Chat! This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">2. Collection of Your Information</h2>
            <p className="text-gray-200 leading-relaxed">
              We may collect information about you in a variety of ways. The information we may collect via the Application includes:
            </p>
            <ul className="list-disc list-inside text-gray-200 leading-relaxed mt-3 space-y-2">
              <li>Personal Data: Personally identifiable information, such as your name, email address, and other details you may provide when you register or communicate with us.</li>
              <li>Chat Data: The content of your conversations with the AI, which is processed to provide the service. We do not store chat logs long-term unless explicitly stated or required for service improvement with your consent.</li>
              <li>Usage Data: Information automatically collected when you access and use the Application, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Application.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">3. Use of Your Information</h2>
            <p className="text-gray-200 leading-relaxed">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:
            </p>
            <ul className="list-disc list-inside text-gray-200 leading-relaxed mt-3 space-y-2">
              <li>Provide and manage your access to our Application.</li>
              <li>Improve our Application and develop new features.</li>
              <li>Respond to your inquiries and offer support.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Application.</li>
              <li>Ensure the security of our Application.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">4. Disclosure of Your Information</h2>
            <p className="text-gray-200 leading-relaxed">
              We do not share your personally identifiable information with third parties except as described in this Privacy Policy or with your consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">5. Security of Your Information</h2>
            <p className="text-gray-200 leading-relaxed">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">6. Changes to This Privacy Policy</h2>
            <p className="text-gray-200 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">7. Contact Us</h2>
            <p className="text-gray-200 leading-relaxed">
              If you have questions or comments about this Privacy Policy, please contact us at: ytsgabcde17@2925.com
            </p>
          </section>

          <div className="mt-10 text-center">
            <Link href="/" className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-md">
              Back to Chat
            </Link>
          </div>
        </main>
      </div>

      {/* Footer Links */}
      <footer className="py-6 px-4 text-center text-xs text-slate-400 w-full">
        <Link href="/" className="hover:underline hover:text-purple-400">Home</Link>
        <span className="mx-2">|</span>
        <a href="#" className="hover:underline hover:text-purple-400">渝ICP备2023003198号-85</a>
        <span className="mx-2">|</span>
        <span>© {new Date().getFullYear()} AI Chat. All rights reserved.</span>
      </footer>
    </div>
  );
}
