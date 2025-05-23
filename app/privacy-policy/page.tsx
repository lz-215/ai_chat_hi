'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* 主内容区域 */}
      <div className="flex-grow flex flex-col items-center w-full px-4 pt-8 sm:pt-10 pb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Политика конфиденциальности
        </h1>
        <p className="text-sm text-gray-300 mb-8">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>

        <main className="w-full max-w-3xl bg-slate-800 bg-opacity-50 p-6 sm:p-8 rounded-lg shadow-lg">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">1. Введение</h2>
            <p className="text-gray-200 leading-relaxed">
              Добро пожаловать в AI Chat! Эта политика конфиденциальности объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию при использовании нашего приложения. Пожалуйста, внимательно прочитайте эту политику конфиденциальности. Если вы не согласны с условиями этой политики, пожалуйста, не используйте приложение.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">2. Сбор информации</h2>
            <p className="text-gray-200 leading-relaxed">
              Мы можем собирать информацию о вас различными способами. Информация, которую мы можем собирать через приложение, включает:
            </p>
            <ul className="list-disc list-inside text-gray-200 leading-relaxed mt-3 space-y-2">
              <li>Личные данные: идентифицирующая информация, такая как ваше имя, адрес электронной почты и другие данные, которые вы можете предоставить при регистрации или общении с нами.</li>
              <li>Данные чата: содержание ваших разговоров с ИИ, которые обрабатываются для предоставления сервиса. Мы не храним журналы чата длительно, если это не указано явно или не требуется для улучшения сервиса с вашего согласия.</li>
              <li>Данные об использовании: информация, автоматически собираемая при доступе и использовании приложения, такая как ваш IP-адрес, тип браузера, операционная система, время доступа и страницы, которые вы просматривали до и после использования приложения.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">3. Использование информации</h2>
            <p className="text-gray-200 leading-relaxed">
              Точная информация о вас позволяет нам предоставлять вам удобный, эффективный и персонализированный опыт. В частности, мы можем использовать собранную через приложение информацию для:
            </p>
            <ul className="list-disc list-inside text-gray-200 leading-relaxed mt-3 space-y-2">
              <li>Предоставления и управления вашим доступом к нашему приложению.</li>
              <li>Улучшения нашего приложения и разработки новых функций.</li>
              <li>Ответа на ваши запросы и предоставления поддержки.</li>
              <li>Мониторинга и анализа использования и тенденций для улучшения вашего опыта работы с приложением.</li>
              <li>Обеспечения безопасности нашего приложения.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">4. Раскрытие информации</h2>
            <p className="text-gray-200 leading-relaxed">
              Мы не передаем вашу личную информацию третьим лицам, кроме случаев, описанных в этой политике конфиденциальности или с вашего согласия.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">5. Безопасность информации</h2>
            <p className="text-gray-200 leading-relaxed">
              Мы используем административные, технические и физические меры безопасности для защиты вашей личной информации. Несмотря на то, что мы предприняли разумные шаги для защиты предоставленной вами информации, ни одна мера безопасности не является совершенной или непроницаемой, и ни один способ передачи данных не может быть гарантированно защищен от перехвата или другого вида злоупотребления.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">6. Изменения в политике конфиденциальности</h2>
            <p className="text-gray-200 leading-relaxed">
              Мы можем время от времени обновлять эту политику конфиденциальности. Мы уведомим вас о любых изменениях, разместив новую политику на этой странице. Рекомендуем регулярно просматривать эту политику для ознакомления с изменениями.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">7. Контакты</h2>
            <p className="text-gray-200 leading-relaxed">
              Если у вас есть вопросы или комментарии по поводу этой политики конфиденциальности, пожалуйста, свяжитесь с нами: ytsgabcde17@2925.com
            </p>
          </section>

          <div className="mt-10 text-center">
            <Link href="/" className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-md">
              Вернуться к чату
            </Link>
          </div>
        </main>
      </div>

      {/* 页脚链接 */}
      <footer className="py-6 px-4 text-center text-xs text-slate-400 w-full">
        <Link href="/" className="hover:underline hover:text-purple-400">Главная</Link>
        <span className="mx-2">|</span>
        <a href="#" className="hover:underline hover:text-purple-400">渝ICP备2023003198号-85</a>
        <span className="mx-2">|</span>
        <span>© {new Date().getFullYear()} AI Chat. Все права защищены.</span>
      </footer>
    </div>
  );
}