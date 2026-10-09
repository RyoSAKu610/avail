// Day 26 解答例: 携帯電話の料金プランを比べよう
// 実行:   go run ./lessons/day26-go/solution
// テスト: go test ./lessons/day26-go/solution
package main

import "fmt"

type FeePlan interface {
	Name() string
	Fee(minutes int) int
}

type MeteredPlan struct{ Rate int }

func (p MeteredPlan) Name() string        { return "従量プラン" }
func (p MeteredPlan) Fee(minutes int) int { return minutes * p.Rate }

type FlatPlan struct{ Monthly int }

// TODO 1: 使わない引数は名前を _ にしておくと「使っていない」ことがはっきりする
func (p FlatPlan) Name() string  { return "定額プラン" }
func (p FlatPlan) Fee(_ int) int { return p.Monthly }

type HybridPlan struct{ Base, Free, Rate int }

// TODO 2
func (p HybridPlan) Name() string { return "基本料+超過プラン" }
func (p HybridPlan) Fee(minutes int) int {
	over := minutes - p.Free
	if over <= 0 {
		return p.Base
	}
	return p.Base + over*p.Rate
}

// TODO 3: < で比べるので、同じ料金なら先のプランが残る
func cheapest(plans []FeePlan, minutes int) FeePlan {
	best := plans[0]
	for _, p := range plans[1:] {
		if p.Fee(minutes) < best.Fee(minutes) {
			best = p
		}
	}
	return best
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
