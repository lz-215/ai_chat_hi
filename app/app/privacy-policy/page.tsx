'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* 主内容区域 */}
      <div className="flex-grow flex flex-col items-center w-full px-4 pt-8 sm:pt-10 pb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          गोपनीयता नीति
        </h1>
        <p className="text-sm text-gray-300 mb-8">अंतिम अपडेट: {new Date().toLocaleDateString('hi-IN')}</p>

        <main className="w-full max-w-3xl bg-slate-800 bg-opacity-50 p-6 sm:p-8 rounded-lg shadow-lg">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">1. प्रस्तावना</h2>
            <p className="text-gray-200 leading-relaxed">
              AI चैट में आपका स्वागत है! यह गोपनीयता नीति बताती है कि हम आपके ऐप्लिकेशन के उपयोग के दौरान आपकी जानकारी को कैसे इकट्ठा, उपयोग, प्रकट और सुरक्षित करते हैं। कृपया इस गोपनीयता नीति को ध्यान से पढ़ें। यदि आप इस नीति की शर्तों से सहमत नहीं हैं, तो कृपया ऐप्लिकेशन का उपयोग न करें।
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">2. जानकारी का संग्रह</h2>
            <p className="text-gray-200 leading-relaxed">
              हम विभिन्न तरीकों से आपके बारे में जानकारी इकट्ठा कर सकते हैं। ऐप्लिकेशन के माध्यम से हम जो जानकारी इकट्ठा कर सकते हैं, उसमें शामिल हैं:
            </p>
            <ul className="list-disc list-inside text-gray-200 leading-relaxed mt-3 space-y-2">
              <li>व्यक्तिगत डेटा: पहचानने योग्य जानकारी, जैसे आपका नाम, ईमेल पता और अन्य डेटा, जो आप पंजीकरण या हमसे संवाद करते समय प्रदान कर सकते हैं।</li>
              <li>चैट डेटा: आपके AI के साथ बातचीत की सामग्री, जिसे सेवा प्रदान करने के लिए संसाधित किया जाता है। हम चैट लॉग को लंबे समय तक संग्रहीत नहीं करते हैं, जब तक कि यह स्पष्ट रूप से निर्दिष्ट न किया गया हो या आपकी सहमति से सेवा में सुधार के लिए आवश्यक न हो।</li>
              <li>उपयोग डेटा: जानकारी, जो ऐप्लिकेशन तक पहुँचने और उपयोग करने पर स्वचालित रूप से एकत्र की जाती है, जैसे आपका आईपी पता, ब्राउज़र का प्रकार, ऑपरेटिंग सिस्टम, पहुँच का समय और वे पृष्ठ जो आपने ऐप्लिकेशन के उपयोग से पहले और बाद में देखे।</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">3. जानकारी का उपयोग</h2>
            <p className="text-gray-200 leading-relaxed">
              आपके बारे में सटीक जानकारी हमें आपको एक सुविधाजनक, प्रभावी और व्यक्तिगत अनुभव प्रदान करने की अनुमति देती है। विशेष रूप से, हम ऐप्लिकेशन के माध्यम से एकत्रित जानकारी का उपयोग कर सकते हैं:
            </p>
            <ul className="list-disc list-inside text-gray-200 leading-relaxed mt-3 space-y-2">
              <li>हमारे ऐप्लिकेशन तक आपकी पहुँच प्रदान करने और प्रबंधित करने के लिए।</li>
              <li>हमारे ऐप्लिकेशन में सुधार करने और नई सुविधाएँ विकसित करने के लिए।</li>
              <li>आपके प्रश्नों का उत्तर देने और समर्थन प्रदान करने के लिए।</li>
              <li>आपके ऐप्लिकेशन के साथ अनुभव को बेहतर बनाने के लिए उपयोग और प्रवृत्तियों की निगरानी और विश्लेषण करने के लिए।</li>
              <li>हमारे ऐप्लिकेशन की सुरक्षा सुनिश्चित करने के लिए।</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">4. जानकारी का प्रकटीकरण</h2>
            <p className="text-gray-200 leading-relaxed">
              हम आपकी व्यक्तिगत जानकारी को तीसरे पक्ष के साथ साझा नहीं करते हैं, सिवाय उन मामलों के जो इस गोपनीयता नीति में वर्णित हैं या आपकी सहमति से हैं।
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">5. जानकारी की सुरक्षा</h2>
            <p className="text-gray-200 leading-relaxed">
              हम आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए प्रशासनिक, तकनीकी और भौतिक सुरक्षा उपायों का उपयोग करते हैं। हालांकि, हमने आपकी द्वारा प्रदान की गई जानकारी की सुरक्षा के लिए उचित कदम उठाए हैं, कोई भी सुरक्षा उपाय पूर्ण या अभेद्य नहीं होता है, और डेटा संचरण का कोई भी तरीका इंटरसेप्शन या अन्य प्रकार के दुरुपयोग से सुरक्षित नहीं हो सकता है।
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">6. गोपनीयता नीति में परिवर्तन</h2>
            <p className="text-gray-200 leading-relaxed">
              हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। हम इस पृष्ठ पर नई नीति प्रकाशित करके आपको किसी भी परिवर्तन के बारे में सूचित करेंगे। परिवर्तनों के बारे में जानने के लिए इस नीति को नियमित रूप से देखने की सिफारिश की जाती है।
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-300 mb-3">7. संपर्क करें</h2>
            <p className="text-gray-200 leading-relaxed">
              यदि आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न या टिप्पणी है, तो कृपया हमसे संपर्क करें: ytsgabcde23@2925.com
            </p>
          </section>

          <div className="mt-10 text-center">
            <Link href="/" className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-md">
              चैट पर वापस जाएँ
            </Link>
          </div>
        </main>
      </div>

      {/* 页脚链接 */}
      <footer className="py-6 px-4 text-center text-xs text-slate-400 w-full">
        <Link href="/" className="hover:underline hover:text-purple-400">मुख्य पृष्ठ</Link>
        <span className="mx-2">|</span>
        <a href="#" className="hover:underline hover:text-purple-400">渝ICP备2025051720号-60</a>
        <span className="mx-2">|</span>
        <span>© {new Date().getFullYear()} AI Chat. सर्वाधिकार सुरक्षित।</span>
      </footer>
    </div>
  );
}