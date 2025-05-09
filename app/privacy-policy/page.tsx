'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* 主内容区域 */}
      <div className="flex-grow flex flex-col items-center w-full px-4 pt-8 sm:pt-10 pb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          隐私政策
        </h1>
        <p className="text-sm text-gray-300 mb-8">最后更新: {new Date().toLocaleDateString('zh-CN')}</p>

        <main className="w-full max-w-3xl bg-slate-800 bg-opacity-50 p-6 sm:p-8 rounded-lg shadow-lg">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">1. 引言</h2>
            <p className="text-gray-200 leading-relaxed">
              欢迎使用AI Chat！本隐私政策说明了我们在您使用我们的应用程序时如何收集、使用、披露和保护您的信息。请仔细阅读本隐私政策。如果您不同意本隐私政策的条款，请不要访问该应用程序。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">2. 信息收集</h2>
            <p className="text-gray-200 leading-relaxed">
              我们可能通过多种方式收集有关您的信息。我们可能通过应用程序收集的信息包括：
            </p>
            <ul className="list-disc list-inside text-gray-200 leading-relaxed mt-3 space-y-2">
              <li>个人数据：个人身份信息，例如您在注册或与我们沟通时可能提供的姓名、电子邮件地址和其他详细信息。</li>
              <li>聊天数据：您与AI的对话内容，用于提供服务。除非明确说明或在您同意的情况下需要用于服务改进，否则我们不会长期存储聊天日志。</li>
              <li>使用数据：当您访问和使用应用程序时自动收集的信息，例如您的IP地址、浏览器类型、操作系统、访问时间以及您在访问应用程序之前和之后直接查看的页面。</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">3. 信息使用</h2>
            <p className="text-gray-200 leading-relaxed">
              拥有关于您的准确信息使我们能够为您提供流畅、高效和定制化的体验。具体而言，我们可能会将通过应用程序收集的有关您的信息用于：
            </p>
            <ul className="list-disc list-inside text-gray-200 leading-relaxed mt-3 space-y-2">
              <li>提供和管理您对我们应用程序的访问。</li>
              <li>改进我们的应用程序并开发新功能。</li>
              <li>回应您的询问并提供支持。</li>
              <li>监控和分析使用情况和趋势，以改善您的应用程序体验。</li>
              <li>确保我们应用程序的安全。</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">4. 信息披露</h2>
            <p className="text-gray-200 leading-relaxed">
              除本隐私政策中描述的或经您同意的情况外，我们不会与第三方共享您的个人身份信息。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">5. 信息安全</h2>
            <p className="text-gray-200 leading-relaxed">
              我们使用管理、技术和物理安全措施来帮助保护您的个人信息。虽然我们已采取合理步骤来保护您提供给我们的个人信息，但请注意，尽管我们努力，没有任何安全措施是完美或不可穿透的，也不能保证任何数据传输方法不会被拦截或其他类型的滥用。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">6. 隐私政策变更</h2>
            <p className="text-gray-200 leading-relaxed">
              我们可能会不时更新本隐私政策。我们将通过在此页面上发布新的隐私政策来通知您任何更改。建议您定期查看本隐私政策以了解任何变更。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">7. 联系我们</h2>
            <p className="text-gray-200 leading-relaxed">
              如果您对本隐私政策有任何问题或意见，请通过以下方式联系我们：ytsgabcde17@2925.com
            </p>
          </section>

          <div className="mt-10 text-center">
            <Link href="/" className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-md">
              返回聊天
            </Link>
          </div>
        </main>
      </div>

      {/* 页脚链接 */}
      <footer className="py-6 px-4 text-center text-xs text-slate-400 w-full">
        <Link href="/" className="hover:underline hover:text-purple-400">返回首页</Link>
        <span className="mx-2">|</span>
        <a href="#" className="hover:underline hover:text-purple-400">渝ICP备2023003198号-85</a>
        <span className="mx-2">|</span>
        <span>© {new Date().getFullYear()} AI Chat. 保留所有权利。</span>
      </footer>
    </div>
  );
}