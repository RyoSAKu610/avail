// Day 26 のテスト: go test ./lessons/day26-go/exercise で実行する
// ファイル名が _test.go で終わり、関数名が Test で始まるものがテストになる
package main

import "testing"

// テーブル駆動テスト: 入力と期待値の組を並べて、まとめて確かめる (Go の定番の書き方)
func TestFee(t *testing.T) {
	tests := []struct {
		plan    FeePlan
		minutes int
		want    int
	}{
		{MeteredPlan{Rate: 20}, 10, 200},
		{FlatPlan{Monthly: 2000}, 0, 2000},
		{FlatPlan{Monthly: 2000}, 500, 2000},
		{HybridPlan{Base: 1000, Free: 60, Rate: 30}, 30, 1000},
		{HybridPlan{Base: 1000, Free: 60, Rate: 30}, 60, 1000},
		{HybridPlan{Base: 1000, Free: 60, Rate: 30}, 70, 1300},
	}
	for _, tt := range tests {
		if got := tt.plan.Fee(tt.minutes); got != tt.want {
			t.Errorf("%#v.Fee(%d) = %d, want %d", tt.plan, tt.minutes, got, tt.want)
		}
	}
}

func TestCheapest(t *testing.T) {
	plans := []FeePlan{MeteredPlan{Rate: 20}, FlatPlan{Monthly: 2000}}
	if got := cheapest(plans, 10).Name(); got != "従量プラン" {
		t.Errorf("10 分のとき cheapest = %s, want 従量プラン", got)
	}
	if got := cheapest(plans, 500).Name(); got != "定額プラン" {
		t.Errorf("500 分のとき cheapest = %s, want 定額プラン", got)
	}
}
