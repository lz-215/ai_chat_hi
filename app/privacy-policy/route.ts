import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 读取隐私政策 HTML 内容
    const htmlContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Политика конфиденциальности — AI Чат</title>
  <meta name="description" content="Ознакомьтесь с политикой конфиденциальности нашего AI-чата. Узнайте, как мы собираем, используем и защищаем ваши данные.">
  <meta name="keywords" content="политика конфиденциальности, AI-чат, защита данных, условия">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #f8f9fa;
      background: linear-gradient(to bottom right, #0f172a, #4c1d95, #0f172a);
      margin: 0;
      padding: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
      flex-grow: 1;
    }
    h1 {
      font-size: 2rem;
      text-align: center;
      margin-bottom: 1.5rem;
      background: linear-gradient(to right, #a78bfa, #ec4899);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    h2 {
      font-size: 1.5rem;
      color: #a78bfa;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    p, ul {
      margin-bottom: 1rem;
      color: #e2e8f0;
    }
    ul {
      padding-left: 2rem;
    }
    li {
      margin-bottom: 0.5rem;
    }
    .date {
      text-align: center;
      font-size: 0.875rem;
      color: #94a3b8;
      margin-bottom: 2rem;
    }
    .content {
      background-color: rgba(30, 41, 59, 0.5);
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .back-button {
      display: block;
      width: fit-content;
      margin: 2rem auto 0;
      padding: 0.5rem 1.5rem;
      background-color: #7c3aed;
      color: white;
      text-decoration: none;
      border-radius: 9999px;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    .back-button:hover {
      background-color: #6d28d9;
    }
    footer {
      text-align: center;
      padding: 1.5rem 1rem;
      font-size: 0.75rem;
      color: #94a3b8;
    }
    footer a {
      color: #94a3b8;
      text-decoration: none;
    }
    footer a:hover {
      text-decoration: underline;
      color: #a78bfa;
    }
    .footer-divider {
      margin: 0 0.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Политика конфиденциальности</h1>
    <p class="date">Последнее обновление: ${new Date().toLocaleDateString('ru-RU')}</p>
    
    <div class="content">
      <section>
        <h2>1. Введение</h2>
        <p>
          Добро пожаловать в AI Chat! Эта политика конфиденциальности объясняет, как мы собираем, используем, раскрываем и защищаем вашу информацию при использовании нашего приложения. Пожалуйста, внимательно прочитайте эту политику конфиденциальности. Если вы не согласны с условиями этой политики, пожалуйста, не используйте приложение.
        </p>
      </section>

      <section>
        <h2>2. Сбор информации</h2>
        <p>
          Мы можем собирать информацию о вас различными способами. Информация, которую мы можем собирать через приложение, включает:
        </p>
        <ul>
          <li>Личные данные: идентифицирующая информация, такая как ваше имя, адрес электронной почты и другие данные, которые вы можете предоставить при регистрации или общении с нами.</li>
          <li>Данные чата: содержание ваших разговоров с ИИ, которые обрабатываются для предоставления сервиса. Мы не храним журналы чата длительно, если это не указано явно или не требуется для улучшения сервиса с вашего согласия.</li>
          <li>Данные об использовании: информация, автоматически собираемая при доступе и использовании приложения, такая как ваш IP-адрес, тип браузера, операционная система, время доступа и страницы, которые вы просматривали до и после использования приложения.</li>
        </ul>
      </section>

      <section>
        <h2>3. Использование информации</h2>
        <p>
          Точная информация о вас позволяет нам предоставлять вам удобный, эффективный и персонализированный опыт. В частности, мы можем использовать собранную через приложение информацию для:
        </p>
        <ul>
          <li>Предоставления и управления вашим доступом к нашему приложению.</li>
          <li>Улучшения нашего приложения и разработки новых функций.</li>
          <li>Ответа на ваши запросы и предоставления поддержки.</li>
          <li>Мониторинга и анализа использования и тенденций для улучшения вашего опыта работы с приложением.</li>
          <li>Обеспечения безопасности нашего приложения.</li>
        </ul>
      </section>

      <section>
        <h2>4. Раскрытие информации</h2>
        <p>
          Мы не передаем вашу личную информацию третьим лицам, кроме случаев, описанных в этой политике конфиденциальности или с вашего согласия.
        </p>
      </section>

      <section>
        <h2>5. Безопасность информации</h2>
        <p>
          Мы используем административные, технические и физические меры безопасности для защиты вашей личной информации. Несмотря на то, что мы предприняли разумные шаги для защиты предоставленной вами информации, ни одна мера безопасности не является совершенной или непроницаемой, и ни один способ передачи данных не может быть гарантированно защищен от перехвата или другого вида злоупотребления.
        </p>
      </section>

      <section>
        <h2>6. Изменения в политике конфиденциальности</h2>
        <p>
          Мы можем время от времени обновлять эту политику конфиденциальности. Мы уведомим вас о любых изменениях, разместив новую политику на этой странице. Рекомендуем регулярно просматривать эту политику для ознакомления с изменениями.
        </p>
      </section>

      <section>
        <h2>7. Контакты</h2>
        <p>
          Если у вас есть вопросы или комментарии по поводу этой политики конфиденциальности, пожалуйста, свяжитесь с нами: ytsgabcde19@2925.com
        </p>
      </section>

      <a href="/" class="back-button">Вернуться к чату</a>
    </div>
  </div>

  <footer>
    <a href="/">Главная</a>
    <span class="footer-divider">|</span>
    <a href="#">渝ICP备2023003198号-85</a>
    <span class="footer-divider">|</span>
    <span>© ${new Date().getFullYear()} AI Chat. Все права защищены.</span>
  </footer>
</body>
</html>
    `;

    // 返回 HTML 响应
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error serving privacy policy:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
