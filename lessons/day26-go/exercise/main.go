// Day 26 演習: 携帯電話の料金プランを比べよう
// 実行:       go run ./lessons/day26-go/exercise
// テスト:     go test ./lessons/day26-go/exercise
// 答え合わせ: node check.mjs 26
//
// TODO を上から順に直して、expected.txt と同じ出力にしよう。
// main_test.go のテストも通るようにしよう。
package main

import "fmt"

// 料金プランが満たすべき約束 (完成済み)
type FeePlan interface {
	Name() string
	Fee(minutes int) int // 通話時間 (分) から月額料金 (円) を計算する
}

// 従量プラン: 1 分あたり Rate 円 (完成済み。これを手本にしよう)
type MeteredPlan struct{ Rate int }

func (p MeteredPlan) Name() string        { return "従量プラン" }
func (p MeteredPlan) Fee(minutes int) int { return minutes * p.Rate }

// 定額プラン: 何分話しても Monthly 円
type FlatPlan struct{ Monthly int }

// TODO 1: FlatPlan の Name は "定額プラン"、Fee は Monthly を返すようにしよう
func (p FlatPlan) Name() string        { return "?" }
func (p FlatPlan) Fee(minutes int) int { return 0 }

// 基本料+超過プラン: 基本料 Base 円で Free 分まで無料。超えた分は 1 分あたり Rate 円
type HybridPlan struct{ Base, Free, Rate int }

// TODO 2: HybridPlan の Name は "基本料+超過プラン"。
// Fee は Base + (Free を超えた分数 × Rate)。超えていなければ Base だけ
func (p HybridPlan) Name() string        { return "?" }
func (p HybridPlan) Fee(minutes int) int { return 0 }

// TODO 3: plans の中で、minutes 分話したときにいちばん安いプランを返そう
// (同じ料金なら先に出てきたほうを返す)
// 引数が interface のスライスなので、どのプランでも同じように Fee を呼べる
func cheapest(plans []FeePlan, minutes int) FeePlan {
	return plans[0]
}

func main() {
	const minutes = 120
	plans := []FeePlan{
		MeteredPlan{Rate: 20},
		FlatPlan{Monthly: 2000},
		HybridPlan{Base: 1000, Free: 60, Rate: 30},
	}

	fmt.Printf("通話 %d 分の場合\n", minutes)
	for _, p := range plans {
		fmt.Printf("%s: %d円\n", p.Name(), p.Fee(minutes))
	}
	best := cheapest(plans, minutes)
	fmt.Printf("いちばん安いのは: %s (%d円)\n", best.Name(), best.Fee(minutes))
}
