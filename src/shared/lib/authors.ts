export interface Author {
    id: string; // 파일명 (확장자 제외)
    name: string; // 표시될 한글 이름
    imageUrl: string; // public 폴더 기준 경로
  }
  
  export const authorAvatars: Author[] = [
    // 한국 작가
    { id: 'yoon-dongju', name: '윤동주', imageUrl: '/avatars/yoon-dongju.jpg' },
    { id: 'kim-sowol', name: '김소월', imageUrl: '/avatars/kim-sowol.jpg' },
    { id: 'han-yongun', name: '한용운', imageUrl: '/avatars/han-yongun.jpg' },
    { id: 'baek-seok', name: '백석', imageUrl: '/avatars/baek-seok.jpg' },
    { id: 'jeong-jiyong', name: '정지용', imageUrl: '/avatars/jeong-jiyong.jpg' },
    { id: 'lee-yuksa', name: '이육사', imageUrl: '/avatars/lee-yuksa.jpg' },
    { id: 'lee-hyoseok', name: '이효석', imageUrl: '/avatars/lee-hyoseok.jpg' },
    { id: 'kim-yujeong', name: '김유정', imageUrl: '/avatars/kim-yujeong.png' },
    { id: 'lee-sang', name: '이상', imageUrl: '/avatars/lee-sang.jpg' },
    { id: 'hwang-sunwon', name: '황순원', imageUrl: '/avatars/hwang-sunwon.png' },
    { id: 'park-kyungri', name: '박경리', imageUrl: '/avatars/park-kyungri.jpg' },
    { id: 'kim-youngha', name: '김영하', imageUrl: '/avatars/kim-youngha.jpg' },
    { id: 'han-kang', name: '한강', imageUrl: '/avatars/han-kang.jpg' },
    { id: 'park-wansuh', name: '박완서', imageUrl: '/avatars/park-wansuh.jpg' },
    { id: 'ki-hyungdo', name: '기형도', imageUrl: '/avatars/ki-hyungdo.jpg' },
    
    // 외국 작가
    { id: 'shakespeare-william', name: '윌리엄 셰익스피어', imageUrl: '/avatars/shakespeare-william.jpg' },
    { id: 'austen-jane', name: '제인 오스틴', imageUrl: '/avatars/austen-jane.jpg' },
    { id: 'orwell-george', name: '조지 오웰', imageUrl: '/avatars/orwell-george.jpg' },
    { id: 'woolf-virginia', name: '버지니아 울프', imageUrl: '/avatars/woolf-virginia.jpg' },
    { id: 'doyle-arthur-conan', name: '아서 코난 도일', imageUrl: '/avatars/doyle-arthur-conan.png' },
    { id: 'christie-agatha', name: '애거서 크리스티', imageUrl: '/avatars/christie-agatha.jpg' },
    { id: 'dostoevsky-fyodor', name: '표도르 도스토옙스키', imageUrl: '/avatars/dostoevsky-fyodor.png' },
    { id: 'tolstoy-leo', name: '레프 톨스토이', imageUrl: '/avatars/tolstoy-leo.jpg' },
    { id: 'hugo-victor', name: '빅토르 위고', imageUrl: '/avatars/hugo-victor.jpg' },
    { id: 'camus-albert', name: '알베르 카뮈', imageUrl: '/avatars/camus-albert.png' },
    { id: 'hesse-hermann', name: '헤르만 헤세', imageUrl: '/avatars/hesse-hermann.png' },
    { id: 'kafka-franz', name: '프란츠 카프카', imageUrl: '/avatars/kafka-franz.jpg' },
    { id: 'nietzsche-friedrich', name: '프리드리히 니체', imageUrl: '/avatars/nietzsche-friedrich.jpg' },
    { id: 'hemingway-ernest', name: '어니스트 헤밍웨이', imageUrl: '/avatars/hemingway-ernest.png' },
    { id: 'fitzgerald-f-scott', name: 'F. 스콧 피츠제럴드', imageUrl: '/avatars/fitzgerald-f-scott.jpg' },
    { id: 'twain-mark', name: '마크 트웨인', imageUrl: '/avatars/twain-mark.jpg' },
    { id: 'salinger-j-d', name: '제롬 데이비드 샐린저', imageUrl: '/avatars/salinger-j-d.jpg' },
    { id: 'cervantes-miguel-de', name: '미겔 데 세르반테스', imageUrl: '/avatars/cervantes-miguel-de.jpg' },
    { id: 'murakami-haruki', name: '무라카미 하루키', imageUrl: '/avatars/murakami-haruki.png' },
    { id: 'natsume-soseki', name: '나쓰메 소세키', imageUrl: '/avatars/natsume-soseki.png' },
    { id: 'dazai-osamu', name: '다자이 오사무', imageUrl: '/avatars/dazai-osamu.png' },
    { id: 'higashino-keigo', name: '히가시노 게이고', imageUrl: '/avatars/higashino-keigo.png' },
    { id: 'saint-exupery-antoine-de', name: '앙투안 드 생텍쥐페리', imageUrl: '/avatars/saint-exupery-antoine-de.png' },
    { id: 'werber-bernard', name: '베르나르 베르베르', imageUrl: '/avatars/werber-bernard.png' },
    { id: 'kundera-milan', name: '밀란 쿤데라', imageUrl: '/avatars/kundera-milan.jpg' },
    { id: 'marquez-gabriel-garcia', name: '가브리엘 가르시아 마르케스', imageUrl: '/avatars/marquez-gabriel-garcia.png' },
    { id: 'coelho-paulo', name: '파울로 코엘료', imageUrl: '/avatars/coelho-paulo.png' },
    { id: 'tolkien-j-r-r', name: 'J.R.R. 톨킨', imageUrl: '/avatars/tolkien-j-r-r.png' },
    { id: 'rowling-j-k', name: 'J.K. 롤링', imageUrl: '/avatars/rowling-j-k.png' },
    { id: 'ishiguro-kazuo', name: '가즈오 이시구로', imageUrl: '/avatars/ishiguro-kazuo.png' },
    { id: 'carver-raymond', name: '레이먼드 카버', imageUrl: '/avatars/carver-raymond.jpg' },
    { id: 'king-stephen', name: '스티븐 킹', imageUrl: '/avatars/king-stephen.png' },
    { id: 'atwood-margaret', name: '마거릿 애트우드', imageUrl: '/avatars/atwood-margaret.png' },
    { id: 'eco-umberto', name: '움베르토 에코', imageUrl: '/avatars/eco-umberto.png' },
    { id: 'harari-yuval-noah', name: '유발 하라리', imageUrl: '/avatars/harari-yuval-noah.png' },
    { id: 'adams-douglas', name: '더글러스 애덤스', imageUrl: '/avatars/adams-douglas.png' },
    { id: 'mccarthy-cormac', name: '코맥 매카시', imageUrl: '/avatars/mccarthy-cormac.png' },
    { id: 'de-botton-alain', name: '알랭 드 보통', imageUrl: '/avatars/de-botton-alain.png' },
  ];