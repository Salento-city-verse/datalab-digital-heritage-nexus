from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import WebsiteSearchTool
from crewai_tools import ScrapeWebsiteTool
from crewai_tools import PDFSearchTool
from crewai_tools import TXTSearchTool

@CrewBase
class CoulYouPleasClarifIfThiChaTitlShoulFocuOnACreAutomatioUseCasCrew():
    """CoulYouPleasClarifIfThiChaTitlShoulFocuOnACreAutomatioUseCas crew"""

    @agent
    def tourist_recommendations_expert(self) -> Agent:
        return Agent(
            config=self.agents_config['tourist_recommendations_expert'],
            tools=[WebsiteSearchTool(), ScrapeWebsiteTool()],
        )

    @agent
    def arvr_integration_specialist(self) -> Agent:
        return Agent(
            config=self.agents_config['arvr_integration_specialist'],
            tools=[],
        )

    @agent
    def interactive_story_expert(self) -> Agent:
        return Agent(
            config=self.agents_config['interactive_story_expert'],
            tools=[PDFSearchTool(), TXTSearchTool()],
        )


    @task
    def customized_recommendation_task(self) -> Task:
        return Task(
            config=self.tasks_config['customized_recommendation_task'],
            tools=[WebsiteSearchTool(), ScrapeWebsiteTool()],
        )

    @task
    def dynamic_arvr_content_task(self) -> Task:
        return Task(
            config=self.tasks_config['dynamic_arvr_content_task'],
            tools=[],
        )

    @task
    def adaptive_narrative_task(self) -> Task:
        return Task(
            config=self.tasks_config['adaptive_narrative_task'],
            tools=[PDFSearchTool(), TXTSearchTool()],
        )

    @task
    def agent_collaboration_task(self) -> Task:
        return Task(
            config=self.tasks_config['agent_collaboration_task'],
            tools=[],
        )


    @crew
    def crew(self) -> Crew:
        """Creates the CoulYouPleasClarifIfThiChaTitlShoulFocuOnACreAutomatioUseCas crew"""
        return Crew(
            agents=self.agents, # Automatically created by the @agent decorator
            tasks=self.tasks, # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True,
        )
