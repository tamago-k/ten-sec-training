module Api
  class ExercisesController < ApplicationController
    def index
      exercises = [
        { id: 1, name: "スクワット", duration: 10, target: "15〜20回", points: "太ももとお尻に効かせる。ノンストップで深く。" },
        { id: 2, name: "マウンテンクライマー", duration: 10, target: "40〜50回（左右カウントで1回）", points: "腰を落とさず、高速で膝を胸に引きつける。" },
        { id: 3, name: "腕立て伏せ", duration: 10, target: "12〜15回", points: "フォーム維持しつつ速めに。きつければ膝つき可。" },
        { id: 4, name: "Y字バランス", duration: 10, target: "左右5秒ずつキープ", points: "体幹・バランス力強化。膝を伸ばして軸ブレしないように。" },
        { id: 5, name: "エア縄跳び", duration: 10, target: "30〜40回", points: "軽く跳びつつ手も全力で回す。つま先着地意識。" },
        { id: 6, name: "シャドウボクシング", duration: 10, target: "ストレート＋フック 20発以上", points: "腰の回転＋スピード意識。リズムよく強く打つ。" },
        { id: 7, name: "その場全力疾走", duration: 10, target: "ハイニー状態で50歩以上", points: "ももを高く、腕を速く振って爆走するイメージ。" },
        { id: 8, name: "ダンベルあげ", duration: 10, target: "10〜12回（中〜重めの重量）", points: "ゆっくり下ろして、全力で押し上げる。" },
        { id: 9, name: "バーピージャンプ", duration: 10, target: "6〜8回", points: "着地・立ち上がりまで全力。テンポ早めに。" },
        { id: 10, name: "プランク", duration: 10, target: "正しい姿勢で10秒キープ", points: "背中一直線、腹に力。できるなら片足上げで強度UP。" },
        { id: 11, name: "ももあげ", duration: 10, target: "50回以上（左右で1回）", points: "ももは腰の高さ以上、全力で腕も振る。" }
      ]

      render json: exercises
    end
  end
end