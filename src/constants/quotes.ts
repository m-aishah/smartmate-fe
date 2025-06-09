
export interface Quote {
  text: string;
  author: string;
}

export const mockQuotes: Record<string, Quote[]> = {
  en: [
    { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
    { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
    { text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert" },
  ],
  tr: [
    { text: "Öğrenmenin güzel yanı, kimsenin onu sizden alamamasıdır.", author: "B.B. King" },
    { text: "Eğitim, dünyayı değiştirmek için kullanabileceğiniz en güçlü silahtır.", author: "Nelson Mandela" },
    { text: "Ne kadar çok okursan o kadar çok şey bilirsin. Ne kadar çok öğrenirsen, o kadar çok yere gidersin.", author: "Dr. Seuss" },
    { text: "Yarın ölecekmiş gibi yaşa. Sonsuza kadar yaşayacakmış gibi öğren.", author: "Mahatma Gandhi" },
    { text: "Öğrenme kapasitesi bir hediyedir; öğrenme yeteneği bir beceridir; öğrenme isteği bir seçimdir.", author: "Brian Herbert" },
  ],
  ar: [
    { text: "الشيء الجميل في التعلم هو أنه لا يمكن لأحد أن يأخذه منك.", author: "بي بي كينغ" },
    { text: "التعليم هو السلاح الأقوى الذي يمكنك استخدامه لتغيير العالم.", author: "نيلسون مانديلا" },
    { text: "كلما قرأت أكثر، كلما عرفت أشياء أكثر. كلما تعلمت أكثر، كلما ذهبت إلى أماكن أكثر.", author: "الدكتور سوس" },
    { text: "عش كما لو كنت ستموت غداً. تعلم كما لو كنت ستعيش للأبد.", author: "المهاتما غاندي" },
    { text: "القدرة على التعلم هبة؛ والقدرة على التعلم مهارة؛ والرغبة في التعلم اختيار.", author: "بريان هربرت" },
  ]
};
