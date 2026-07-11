from collections import defaultdict

from app.scoring.models import ProviderScore
from app.telemetry.models import TelemetryEvent
from app.telemetry.service import TelemetryService


class ProviderScoringService:
    def __init__(
        self,
        telemetry_service: TelemetryService,
    ) -> None:
        self._telemetry_service = telemetry_service

    def calculate_scores(self) -> list[ProviderScore]:
        events = self._telemetry_service.list_events()

        grouped_events: dict[str, list[TelemetryEvent]] = defaultdict(list)

        for event in events:
            grouped_events[event.provider].append(event)

        scores: list[ProviderScore] = []

        for provider, provider_events in grouped_events.items():
            total_requests = len(provider_events)

            successful_requests = sum(
                1
                for event in provider_events
                if event.status == "success"
            )

            failed_requests = total_requests - successful_requests

            success_rate = successful_requests / total_requests
            failure_rate = failed_requests / total_requests

            average_latency_ms = (
                sum(event.latency_ms for event in provider_events)
                / total_requests
            )

            reliability_score = success_rate * 70

            latency_score = max(
                0.0,
                30.0 - (average_latency_ms / 1000),
            )

            final_score = reliability_score + latency_score

            scores.append(
                ProviderScore(
                    provider=provider,
                    total_requests=total_requests,
                    successful_requests=successful_requests,
                    failed_requests=failed_requests,
                    success_rate=round(success_rate, 4),
                    failure_rate=round(failure_rate, 4),
                    average_latency_ms=round(average_latency_ms, 2),
                    score=round(final_score, 2),
                )
            )

        return sorted(
            scores,
            key=lambda provider_score: provider_score.score,
            reverse=True,
        )